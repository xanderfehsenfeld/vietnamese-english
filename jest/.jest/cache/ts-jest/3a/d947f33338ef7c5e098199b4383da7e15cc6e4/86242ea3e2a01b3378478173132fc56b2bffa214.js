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
    var adjacentWords = lodash_1.flatten(compoundWord
        .split(' ')
        .map(function (x) {
        return getAdjacentWords(x, wordsWithoutSpacesMappedToCompoundWords);
    })).concat([
        compoundWord,
    ]);
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
    var nodes = lodash_1.uniqBy(singularWords.map(getMagentaNode).concat(compoundNodes), function (_a) {
        var id = _a.id;
        return id;
    });
    var links = filterUniqueLinks(lodash_1.flatten(singularWords.map(function (singularWord) {
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
    })));
    return { links: links, nodes: nodes };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQThDO0FBRTlDLElBQU0saUJBQWlCLEdBQUcsVUFBQyxLQUFrQjtJQUMzQyxJQUFNLFdBQVcsR0FBK0IsRUFBRSxDQUFBO0lBRWxELE9BQU8sZUFBTSxDQUFDLEtBQUssRUFBRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFBTyxPQUFBLE1BQU0sR0FBRyxNQUFNO0lBQWYsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUNsRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFDZixJQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzNCLElBQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDL0IsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFBO1NBQ2I7YUFBTTtZQUNMLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDdkIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUMzQixPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFNLGNBQWMsR0FBRyxVQUFDLEVBQVUsSUFBSyxPQUFBLENBQUM7SUFDdEMsRUFBRSxJQUFBO0lBQ0YsS0FBSyxFQUFFLFNBQVM7Q0FDakIsQ0FBQyxFQUhxQyxDQUdyQyxDQUFBO0FBRUYsSUFBTSxZQUFZLEdBQUcsVUFBQyxFQUFVLElBQUssT0FBQSxDQUFDO0lBQ3BDLEVBQUUsSUFBQTtJQUNGLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQyxFQUhtQyxDQUduQyxDQUFBO0FBRUYsSUFBTSxnQkFBZ0IsR0FBRyxVQUN2QixnQkFBd0IsRUFDeEIsNEJBQXlEO0lBRXpELElBQUksYUFBYSxHQUFHLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDbEUsSUFBSSxhQUFhLEVBQUU7UUFDakIsT0FBTyxhQUFJLENBQUssYUFBYSxTQUFFLGdCQUFnQixHQUFFLENBQUE7S0FDbEQ7U0FBTTtRQUNMLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLDJCQUEyQixHQUFHLFVBQ3pDLFlBQW9CLEVBQ3BCLHVDQUFvRTtJQUVwRSxJQUFNLGFBQWEsR0FDZCxnQkFBTyxDQUNSLFlBQVk7U0FDVCxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLFVBQUMsQ0FBQztRQUNMLE9BQUEsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLHVDQUF1QyxDQUFDO0lBQTVELENBQTRELENBQzdELENBQ0o7UUFDRCxZQUFZO01BQ2IsQ0FBQTtJQUVELElBQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQ3hDLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFoQyxDQUFnQyxDQUMvQyxDQUFBO0lBQ0QsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FDeEMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQWhDLENBQWdDLENBQy9DLENBQUE7SUFDRCxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUTtRQUMvQyxJQUFNLG1CQUFtQixHQUFHLGdCQUFPLENBQ2pDLFFBQVE7YUFDTCxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLFVBQUMsQ0FBQztZQUNMLE9BQUEsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLHVDQUF1QyxDQUFDLENBQUMsTUFBTSxDQUNqRSxVQUFDLEdBQUcsSUFBSyxPQUFBLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBNUIsQ0FBNEIsQ0FDdEM7UUFGRCxDQUVDLENBQ0YsQ0FDSixDQUFBO1FBQ0QsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsNEJBQVksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFFLG1CQUFtQixxQkFBQSxFQUFFLEtBQUssRUFBRSxRQUFRLElBQUU7U0FDM0U7YUFBTTtZQUNMLDRCQUFZLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBRSxtQkFBbUIscUJBQUEsSUFBRTtTQUMxRDtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBTSxLQUFLLEdBQUcsZUFBTSxDQUNkLGFBQWEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFFBQUssYUFBYSxHQUN2RCxVQUFDLEVBQU07WUFBSixVQUFFO1FBQU8sT0FBQSxFQUFFO0lBQUYsQ0FBRSxDQUNmLENBQUE7SUFFRCxJQUFNLEtBQUssR0FBZ0IsaUJBQWlCLENBQzFDLGdCQUFPLENBQ0wsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQVk7UUFDN0IsSUFBTSxTQUFTLEdBQ2IsdUNBQXVDLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFdkQsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFTLElBQUssT0FBQSxDQUFDO2dCQUNuQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFLFlBQVk7YUFDckIsQ0FBQyxFQUhrQyxDQUdsQyxDQUFDLENBQUE7U0FDSjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUE7U0FDVjtJQUNILENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQTtJQUNELE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFBO0FBQ3pCLENBQUMsQ0FBQSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMveGFuZGVyZmVoc2VuZmVsZC9EZXNrdG9wL3ZpZXRuYW1lc2UtZW5nbGlzaC9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29yZEdyYXBoL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaERhdGEsIEdyYXBoTGluayB9IGZyb20gJy4uJ1xuaW1wb3J0IHsgZmxhdHRlbiwgdW5pcUJ5LCB1bmlxIH0gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBmaWx0ZXJVbmlxdWVMaW5rcyA9IChsaW5rczogR3JhcGhMaW5rW10pID0+IHtcbiAgY29uc3QgYWxyZWFkeVNlZW46IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge31cblxuICByZXR1cm4gdW5pcUJ5KGxpbmtzLCAoeyBzb3VyY2UsIHRhcmdldCB9KSA9PiBzb3VyY2UgKyB0YXJnZXQpLmZpbHRlcihcbiAgICAoeyBzb3VyY2UsIHRhcmdldCB9KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBzb3VyY2UgKyB0YXJnZXRcbiAgICAgIGNvbnN0IHJldmVyc2UgPSB0YXJnZXQgKyBzb3VyY2VcbiAgICAgIGlmIChhbHJlYWR5U2VlbltrZXldIHx8IGFscmVhZHlTZWVuW3JldmVyc2VdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxyZWFkeVNlZW5ba2V5XSA9IHRydWVcbiAgICAgICAgYWxyZWFkeVNlZW5bcmV2ZXJzZV0gPSB0cnVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgKVxufVxuXG5jb25zdCBnZXRNYWdlbnRhTm9kZSA9IChpZDogc3RyaW5nKSA9PiAoe1xuICBpZCxcbiAgY29sb3I6ICdtYWdlbnRhJyxcbn0pXG5cbmNvbnN0IGdldEdyZWVuTm9kZSA9IChpZDogc3RyaW5nKSA9PiAoe1xuICBpZCxcbiAgY29sb3I6ICdncmVlbicsXG59KVxuXG5jb25zdCBnZXRBZGphY2VudFdvcmRzID0gKFxuICB3b3JkV2l0aE5vU3BhY2VzOiBzdHJpbmcsXG4gIHN1YldvcmRNYXBwZWRUb0NvbXBvdW5kV29yZHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSxcbikgPT4ge1xuICBsZXQgYWRqYWNlbnRXb3JkcyA9IHN1YldvcmRNYXBwZWRUb0NvbXBvdW5kV29yZHNbd29yZFdpdGhOb1NwYWNlc11cbiAgaWYgKGFkamFjZW50V29yZHMpIHtcbiAgICByZXR1cm4gdW5pcShbLi4uYWRqYWNlbnRXb3Jkcywgd29yZFdpdGhOb1NwYWNlc10pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCA9IChcbiAgY29tcG91bmRXb3JkOiBzdHJpbmcsXG4gIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9LFxuKTogR3JhcGhEYXRhID0+IHtcbiAgY29uc3QgYWRqYWNlbnRXb3JkcyA9IFtcbiAgICAuLi5mbGF0dGVuKFxuICAgICAgY29tcG91bmRXb3JkXG4gICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgZ2V0QWRqYWNlbnRXb3Jkcyh4LCB3b3Jkc1dpdGhvdXRTcGFjZXNNYXBwZWRUb0NvbXBvdW5kV29yZHMpLFxuICAgICAgICApLFxuICAgICksXG4gICAgY29tcG91bmRXb3JkLFxuICBdXG5cbiAgY29uc3QgY29tcG91bmRXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggIT09IDEsXG4gIClcbiAgY29uc3Qgc2luZ3VsYXJXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggPT09IDEsXG4gIClcbiAgY29uc3QgY29tcG91bmROb2RlcyA9IGNvbXBvdW5kV29yZHMubWFwKCh3b3JkVGV4dCkgPT4ge1xuICAgIGNvbnN0IGhpZGRlbkFkamFjZW50Tm9kZXMgPSBmbGF0dGVuKFxuICAgICAgd29yZFRleHRcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgodikgPT5cbiAgICAgICAgICBnZXRBZGphY2VudFdvcmRzKHYsIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkcykuZmlsdGVyKFxuICAgICAgICAgICAgKGFkaikgPT4gIWFkamFjZW50V29yZHMuaW5jbHVkZXMoYWRqKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgIClcbiAgICBpZiAoaGlkZGVuQWRqYWNlbnROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IC4uLmdldEdyZWVuTm9kZSh3b3JkVGV4dCksIGhpZGRlbkFkamFjZW50Tm9kZXMsIGNvbG9yOiAnb3JhbmdlJyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IC4uLmdldEdyZWVuTm9kZSh3b3JkVGV4dCksIGhpZGRlbkFkamFjZW50Tm9kZXMgfVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBub2RlcyA9IHVuaXFCeShcbiAgICBbLi4uc2luZ3VsYXJXb3Jkcy5tYXAoZ2V0TWFnZW50YU5vZGUpLCAuLi5jb21wb3VuZE5vZGVzXSxcbiAgICAoeyBpZCB9KSA9PiBpZCxcbiAgKVxuXG4gIGNvbnN0IGxpbmtzOiBHcmFwaExpbmtbXSA9IGZpbHRlclVuaXF1ZUxpbmtzKFxuICAgIGZsYXR0ZW4oXG4gICAgICBzaW5ndWxhcldvcmRzLm1hcCgoc2luZ3VsYXJXb3JkKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkamFjZW50czogdW5kZWZpbmVkIHwgc3RyaW5nW10gPVxuICAgICAgICAgIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3Jkc1tzaW5ndWxhcldvcmRdXG5cbiAgICAgICAgaWYgKGFkamFjZW50cykge1xuICAgICAgICAgIHJldHVybiBhZGphY2VudHMubWFwKChvdGhlcldvcmQpID0+ICh7XG4gICAgICAgICAgICBzb3VyY2U6IG90aGVyV29yZCxcbiAgICAgICAgICAgIHRhcmdldDogc2luZ3VsYXJXb3JkLFxuICAgICAgICAgIH0pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApLFxuICApXG4gIHJldHVybiB7IGxpbmtzLCBub2RlcyB9XG59XG4iXSwidmVyc2lvbiI6M30=