"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var filterUniqueLinks = function (links) {
    var alreadySeen = {};
    return lodash_1.uniqBy(links, function (_a) {
        var source = _a.source, target = _a.target;
        return source + target;
    }).filter(function (_a) {
        var source = _a.source, target = _a.target;
        var key = source + target;
        var reverse = target + source;
        if (alreadySeen[key] || alreadySeen[reverse]) {
            return false;
        }
        else {
            alreadySeen[key] = true;
            alreadySeen[reverse] = true;
            return true;
        }
    });
};
var getMagentaNode = function (id) { return ({
    id: id,
    color: 'magenta',
}); };
var getGreenNode = function (id) { return ({
    id: id,
    color: 'green',
}); };
var getAdjacentWords = function (wordWithNoSpaces, subWordMappedToCompoundWords) {
    var adjacentWords = subWordMappedToCompoundWords[wordWithNoSpaces];
    if (adjacentWords) {
        return lodash_1.uniq(adjacentWords.concat([wordWithNoSpaces]));
    }
    else {
        return [];
    }
};
exports.getGraphDataForCompoundWord = function (compoundWord, wordsWithoutSpacesMappedToCompoundWords) {
    var adjacentWords = lodash_1.uniq(lodash_1.flatten(compoundWord
        .split(' ')
        .map(function (x) {
        return getAdjacentWords(x, wordsWithoutSpacesMappedToCompoundWords);
    })).concat([
        compoundWord,
    ]));
    var compoundWords = adjacentWords.filter(function (wordText) { return wordText.split(' ').length !== 1; });
    var singularWords = adjacentWords.filter(function (wordText) { return wordText.split(' ').length === 1; });
    var compoundNodes = compoundWords.map(function (wordText) {
        var hiddenAdjacentNodes = lodash_1.flatten(wordText
            .split(' ')
            .map(function (v) {
            return getAdjacentWords(v, wordsWithoutSpacesMappedToCompoundWords).filter(function (adj) { return !adjacentWords.includes(adj); });
        }));
        if (hiddenAdjacentNodes.length) {
            return tslib_1.__assign({}, getGreenNode(wordText), { hiddenAdjacentNodes: hiddenAdjacentNodes, color: 'orange' });
        }
        else {
            return tslib_1.__assign({}, getGreenNode(wordText), { hiddenAdjacentNodes: hiddenAdjacentNodes });
        }
    });
    var nodes = singularWords.map(getMagentaNode).concat(compoundNodes);
    var links = lodash_1.flatten(singularWords.map(function (singularWord) {
        var adjacents = wordsWithoutSpacesMappedToCompoundWords[singularWord];
        if (adjacents) {
            return adjacents.map(function (otherWord) { return ({
                source: otherWord,
                target: singularWord,
            }); });
        }
        else {
            return [];
        }
    }));
    return { links: links, nodes: nodes };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQThDO0FBRTlDLElBQU0saUJBQWlCLEdBQUcsVUFBQyxLQUFrQjtJQUMzQyxJQUFNLFdBQVcsR0FBK0IsRUFBRSxDQUFBO0lBRWxELE9BQU8sZUFBTSxDQUFDLEtBQUssRUFBRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFBTyxPQUFBLE1BQU0sR0FBRyxNQUFNO0lBQWYsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUNsRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFDZixJQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzNCLElBQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDL0IsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFBO1NBQ2I7YUFBTTtZQUNMLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDdkIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUMzQixPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFNLGNBQWMsR0FBRyxVQUFDLEVBQVUsSUFBSyxPQUFBLENBQUM7SUFDdEMsRUFBRSxJQUFBO0lBQ0YsS0FBSyxFQUFFLFNBQVM7Q0FDakIsQ0FBQyxFQUhxQyxDQUdyQyxDQUFBO0FBRUYsSUFBTSxZQUFZLEdBQUcsVUFBQyxFQUFVLElBQUssT0FBQSxDQUFDO0lBQ3BDLEVBQUUsSUFBQTtJQUNGLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQyxFQUhtQyxDQUduQyxDQUFBO0FBRUYsSUFBTSxnQkFBZ0IsR0FBRyxVQUN2QixnQkFBd0IsRUFDeEIsNEJBQXlEO0lBRXpELElBQUksYUFBYSxHQUFHLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDbEUsSUFBSSxhQUFhLEVBQUU7UUFDakIsT0FBTyxhQUFJLENBQUssYUFBYSxTQUFFLGdCQUFnQixHQUFFLENBQUE7S0FDbEQ7U0FBTTtRQUNMLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLDJCQUEyQixHQUFHLFVBQ3pDLFlBQW9CLEVBQ3BCLHVDQUFvRTtJQUVwRSxJQUFNLGFBQWEsR0FBRyxhQUFJLENBQ3JCLGdCQUFPLENBQ1IsWUFBWTtTQUNULEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixHQUFHLENBQUMsVUFBQyxDQUFDO1FBQ0wsT0FBQSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsdUNBQXVDLENBQUM7SUFBNUQsQ0FBNEQsQ0FDN0QsQ0FDSjtRQUNELFlBQVk7T0FDWixDQUFBO0lBRUYsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FDeEMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQWhDLENBQWdDLENBQy9DLENBQUE7SUFDRCxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUN4QyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FDL0MsQ0FBQTtJQUNELElBQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRO1FBQy9DLElBQU0sbUJBQW1CLEdBQUcsZ0JBQU8sQ0FDakMsUUFBUTthQUNMLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsVUFBQyxDQUFDO1lBQ0wsT0FBQSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsdUNBQXVDLENBQUMsQ0FBQyxNQUFNLENBQ2pFLFVBQUMsR0FBRyxJQUFLLE9BQUEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUE1QixDQUE0QixDQUN0QztRQUZELENBRUMsQ0FDRixDQUNKLENBQUE7UUFDRCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtZQUM5Qiw0QkFBWSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUUsbUJBQW1CLHFCQUFBLEVBQUUsS0FBSyxFQUFFLFFBQVEsSUFBRTtTQUMzRTthQUFNO1lBQ0wsNEJBQVksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFFLG1CQUFtQixxQkFBQSxJQUFFO1NBQzFEO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFNLEtBQUssR0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFLLGFBQWEsQ0FBQyxDQUFBO0lBRXRFLElBQU0sS0FBSyxHQUFnQixnQkFBTyxDQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUMsWUFBWTtRQUM3QixJQUFNLFNBQVMsR0FDYix1Q0FBdUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUV2RCxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLENBQUM7Z0JBQ25DLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixNQUFNLEVBQUUsWUFBWTthQUNyQixDQUFDLEVBSGtDLENBR2xDLENBQUMsQ0FBQTtTQUNKO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNELE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFBO0FBQ3pCLENBQUMsQ0FBQSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMveGFuZGVyZmVoc2VuZmVsZC9EZXNrdG9wL3ZpZXRuYW1lc2UtZW5nbGlzaC9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29yZEdyYXBoL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaERhdGEsIEdyYXBoTGluayB9IGZyb20gJy4uJ1xuaW1wb3J0IHsgZmxhdHRlbiwgdW5pcUJ5LCB1bmlxIH0gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBmaWx0ZXJVbmlxdWVMaW5rcyA9IChsaW5rczogR3JhcGhMaW5rW10pID0+IHtcbiAgY29uc3QgYWxyZWFkeVNlZW46IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge31cblxuICByZXR1cm4gdW5pcUJ5KGxpbmtzLCAoeyBzb3VyY2UsIHRhcmdldCB9KSA9PiBzb3VyY2UgKyB0YXJnZXQpLmZpbHRlcihcbiAgICAoeyBzb3VyY2UsIHRhcmdldCB9KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBzb3VyY2UgKyB0YXJnZXRcbiAgICAgIGNvbnN0IHJldmVyc2UgPSB0YXJnZXQgKyBzb3VyY2VcbiAgICAgIGlmIChhbHJlYWR5U2VlbltrZXldIHx8IGFscmVhZHlTZWVuW3JldmVyc2VdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxyZWFkeVNlZW5ba2V5XSA9IHRydWVcbiAgICAgICAgYWxyZWFkeVNlZW5bcmV2ZXJzZV0gPSB0cnVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgKVxufVxuXG5jb25zdCBnZXRNYWdlbnRhTm9kZSA9IChpZDogc3RyaW5nKSA9PiAoe1xuICBpZCxcbiAgY29sb3I6ICdtYWdlbnRhJyxcbn0pXG5cbmNvbnN0IGdldEdyZWVuTm9kZSA9IChpZDogc3RyaW5nKSA9PiAoe1xuICBpZCxcbiAgY29sb3I6ICdncmVlbicsXG59KVxuXG5jb25zdCBnZXRBZGphY2VudFdvcmRzID0gKFxuICB3b3JkV2l0aE5vU3BhY2VzOiBzdHJpbmcsXG4gIHN1YldvcmRNYXBwZWRUb0NvbXBvdW5kV29yZHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSxcbikgPT4ge1xuICBsZXQgYWRqYWNlbnRXb3JkcyA9IHN1YldvcmRNYXBwZWRUb0NvbXBvdW5kV29yZHNbd29yZFdpdGhOb1NwYWNlc11cbiAgaWYgKGFkamFjZW50V29yZHMpIHtcbiAgICByZXR1cm4gdW5pcShbLi4uYWRqYWNlbnRXb3Jkcywgd29yZFdpdGhOb1NwYWNlc10pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCA9IChcbiAgY29tcG91bmRXb3JkOiBzdHJpbmcsXG4gIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9LFxuKTogR3JhcGhEYXRhID0+IHtcbiAgY29uc3QgYWRqYWNlbnRXb3JkcyA9IHVuaXEoW1xuICAgIC4uLmZsYXR0ZW4oXG4gICAgICBjb21wb3VuZFdvcmRcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICBnZXRBZGphY2VudFdvcmRzKHgsIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkcyksXG4gICAgICAgICksXG4gICAgKSxcbiAgICBjb21wb3VuZFdvcmQsXG4gIF0pXG5cbiAgY29uc3QgY29tcG91bmRXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggIT09IDEsXG4gIClcbiAgY29uc3Qgc2luZ3VsYXJXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggPT09IDEsXG4gIClcbiAgY29uc3QgY29tcG91bmROb2RlcyA9IGNvbXBvdW5kV29yZHMubWFwKCh3b3JkVGV4dCkgPT4ge1xuICAgIGNvbnN0IGhpZGRlbkFkamFjZW50Tm9kZXMgPSBmbGF0dGVuKFxuICAgICAgd29yZFRleHRcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgodikgPT5cbiAgICAgICAgICBnZXRBZGphY2VudFdvcmRzKHYsIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkcykuZmlsdGVyKFxuICAgICAgICAgICAgKGFkaikgPT4gIWFkamFjZW50V29yZHMuaW5jbHVkZXMoYWRqKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgIClcbiAgICBpZiAoaGlkZGVuQWRqYWNlbnROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IC4uLmdldEdyZWVuTm9kZSh3b3JkVGV4dCksIGhpZGRlbkFkamFjZW50Tm9kZXMsIGNvbG9yOiAnb3JhbmdlJyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IC4uLmdldEdyZWVuTm9kZSh3b3JkVGV4dCksIGhpZGRlbkFkamFjZW50Tm9kZXMgfVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBub2RlcyA9IFsuLi5zaW5ndWxhcldvcmRzLm1hcChnZXRNYWdlbnRhTm9kZSksIC4uLmNvbXBvdW5kTm9kZXNdXG5cbiAgY29uc3QgbGlua3M6IEdyYXBoTGlua1tdID0gZmxhdHRlbihcbiAgICBzaW5ndWxhcldvcmRzLm1hcCgoc2luZ3VsYXJXb3JkKSA9PiB7XG4gICAgICBjb25zdCBhZGphY2VudHM6IHVuZGVmaW5lZCB8IHN0cmluZ1tdID1cbiAgICAgICAgd29yZHNXaXRob3V0U3BhY2VzTWFwcGVkVG9Db21wb3VuZFdvcmRzW3Npbmd1bGFyV29yZF1cblxuICAgICAgaWYgKGFkamFjZW50cykge1xuICAgICAgICByZXR1cm4gYWRqYWNlbnRzLm1hcCgob3RoZXJXb3JkKSA9PiAoe1xuICAgICAgICAgIHNvdXJjZTogb3RoZXJXb3JkLFxuICAgICAgICAgIHRhcmdldDogc2luZ3VsYXJXb3JkLFxuICAgICAgICB9KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH0pLFxuICApXG4gIHJldHVybiB7IGxpbmtzLCBub2RlcyB9XG59XG4iXSwidmVyc2lvbiI6M30=