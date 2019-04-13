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
    var links = [];
    var compoundWords = adjacentWords.filter(function (wordText) { return wordText.split(' ').length !== 1; });
    var singularWords = adjacentWords.filter(function (wordText) { return wordText.split(' ').length === 1; });
    var compoundNodes = compoundWords.map(function (wordText) {
        var hiddenAdjacentNodes = wordText
            .split(' ')
            .map(function (v) { return getAdjacentWords(v, wordsWithoutSpacesMappedToCompoundWords); });
        return tslib_1.__assign({}, getGreenNode(wordText), { hiddenAdjacentNodes: hiddenAdjacentNodes });
    });
    var nodes = singularWords.map(getMagentaNode).concat(compoundNodes);
    adjacentWords.forEach(function (word) {
        var subwords = word.split(' ');
        var otherWordsSharingSubwords = lodash_1.flatten(subwords.map(function (sub) {
            var otherWordsWithSub = adjacentWords.filter(function (target) { return target === sub; });
            return otherWordsWithSub.map(function (otherWord) { return ({
                source: word,
                target: otherWord,
            }); });
        })).filter(function (_a) {
            var source = _a.source, target = _a.target;
            return source !== target;
        });
        links = links.concat(otherWordsSharingSubwords);
    });
    var uniqueLinks = filterUniqueLinks(links);
    return { links: uniqueLinks, nodes: nodes };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQThDO0FBRTlDLElBQU0saUJBQWlCLEdBQUcsVUFBQyxLQUFrQjtJQUMzQyxJQUFNLFdBQVcsR0FBK0IsRUFBRSxDQUFBO0lBRWxELE9BQU8sZUFBTSxDQUFDLEtBQUssRUFBRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFBTyxPQUFBLE1BQU0sR0FBRyxNQUFNO0lBQWYsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUNsRSxVQUFDLEVBQWtCO1lBQWhCLGtCQUFNLEVBQUUsa0JBQU07UUFDZixJQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzNCLElBQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDL0IsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFBO1NBQ2I7YUFBTTtZQUNMLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDdkIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUMzQixPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFNLGNBQWMsR0FBRyxVQUFDLEVBQVUsSUFBSyxPQUFBLENBQUM7SUFDdEMsRUFBRSxJQUFBO0lBQ0YsS0FBSyxFQUFFLFNBQVM7Q0FDakIsQ0FBQyxFQUhxQyxDQUdyQyxDQUFBO0FBRUYsSUFBTSxZQUFZLEdBQUcsVUFBQyxFQUFVLElBQUssT0FBQSxDQUFDO0lBQ3BDLEVBQUUsSUFBQTtJQUNGLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQyxFQUhtQyxDQUduQyxDQUFBO0FBRUYsSUFBTSxnQkFB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ZXJmZWhzZW5mZWxkL0Rlc2t0b3AvdmlldG5hbWVzZS1lbmdsaXNoL3NyYy9jbGllbnQvY29tcG9uZW50cy9Xb3JkR3JhcGgvbGliL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoRGF0YSwgR3JhcGhMaW5rIH0gZnJvbSAnLi4nXG5pbXBvcnQgeyBmbGF0dGVuLCB1bmlxQnksIHVuaXEgfSBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IGZpbHRlclVuaXF1ZUxpbmtzID0gKGxpbmtzOiBHcmFwaExpbmtbXSkgPT4ge1xuICBjb25zdCBhbHJlYWR5U2VlbjogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fVxuXG4gIHJldHVybiB1bmlxQnkobGlua3MsICh7IHNvdXJjZSwgdGFyZ2V0IH0pID0+IHNvdXJjZSArIHRhcmdldCkuZmlsdGVyKFxuICAgICh7IHNvdXJjZSwgdGFyZ2V0IH0pID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHNvdXJjZSArIHRhcmdldFxuICAgICAgY29uc3QgcmV2ZXJzZSA9IHRhcmdldCArIHNvdXJjZVxuICAgICAgaWYgKGFscmVhZHlTZWVuW2tleV0gfHwgYWxyZWFkeVNlZW5bcmV2ZXJzZV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbHJlYWR5U2VlbltrZXldID0gdHJ1ZVxuICAgICAgICBhbHJlYWR5U2VlbltyZXZlcnNlXSA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9LFxuICApXG59XG5cbmNvbnN0IGdldE1hZ2VudGFOb2RlID0gKGlkOiBzdHJpbmcpID0+ICh7XG4gIGlkLFxuICBjb2xvcjogJ21hZ2VudGEnLFxufSlcblxuY29uc3QgZ2V0R3JlZW5Ob2RlID0gKGlkOiBzdHJpbmcpID0+ICh7XG4gIGlkLFxuICBjb2xvcjogJ2dyZWVuJyxcbn0pXG5cbmNvbnN0IGdldEFkamFjZW50V29yZHMgPSAoXG4gIHdvcmRXaXRoTm9TcGFjZXM6IHN0cmluZyxcbiAgc3ViV29yZE1hcHBlZFRvQ29tcG91bmRXb3JkczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9LFxuKSA9PiB7XG4gIGxldCBhZGphY2VudFdvcmRzID0gc3ViV29yZE1hcHBlZFRvQ29tcG91bmRXb3Jkc1t3b3JkV2l0aE5vU3BhY2VzXVxuICBpZiAoYWRqYWNlbnRXb3Jkcykge1xuICAgIHJldHVybiB1bmlxKFsuLi5hZGphY2VudFdvcmRzLCB3b3JkV2l0aE5vU3BhY2VzXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW11cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkID0gKFxuICBjb21wb3VuZFdvcmQ6IHN0cmluZyxcbiAgd29yZHNXaXRob3V0U3BhY2VzTWFwcGVkVG9Db21wb3VuZFdvcmRzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0sXG4pOiBHcmFwaERhdGEgPT4ge1xuICBjb25zdCBhZGphY2VudFdvcmRzID0gW1xuICAgIC4uLmZsYXR0ZW4oXG4gICAgICBjb21wb3VuZFdvcmRcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICBnZXRBZGphY2VudFdvcmRzKHgsIHdvcmRzV2l0aG91dFNwYWNlc01hcHBlZFRvQ29tcG91bmRXb3JkcyksXG4gICAgICAgICksXG4gICAgKSxcbiAgICBjb21wb3VuZFdvcmQsXG4gIF1cbiAgbGV0IGxpbmtzOiBHcmFwaExpbmtbXSA9IFtdXG5cbiAgY29uc3QgY29tcG91bmRXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggIT09IDEsXG4gIClcbiAgY29uc3Qgc2luZ3VsYXJXb3JkcyA9IGFkamFjZW50V29yZHMuZmlsdGVyKFxuICAgICh3b3JkVGV4dCkgPT4gd29yZFRleHQuc3BsaXQoJyAnKS5sZW5ndGggPT09IDEsXG4gIClcbiAgY29uc3QgY29tcG91bmROb2RlcyA9IGNvbXBvdW5kV29yZHMubWFwKCh3b3JkVGV4dCkgPT4ge1xuICAgIGNvbnN0IGhpZGRlbkFkamFjZW50Tm9kZXMgPSB3b3JkVGV4dFxuICAgICAgLnNwbGl0KCcgJylcbiAgICAgIC5tYXAoKHYpID0+IGdldEFkamFjZW50V29yZHModiwgd29yZHNXaXRob3V0U3BhY2VzTWFwcGVkVG9Db21wb3VuZFdvcmRzKSlcbiAgICByZXR1cm4geyAuLi5nZXRHcmVlbk5vZGUod29yZFRleHQpLCBoaWRkZW5BZGphY2VudE5vZGVzIH1cbiAgfSlcblxuICBjb25zdCBub2RlcyA9IFsuLi5zaW5ndWxhcldvcmRzLm1hcChnZXRNYWdlbnRhTm9kZSksIC4uLmNvbXBvdW5kTm9kZXNdXG5cbiAgYWRqYWNlbnRXb3Jkcy5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgY29uc3Qgc3Vid29yZHMgPSB3b3JkLnNwbGl0KCcgJylcblxuICAgIGNvbnN0IG90aGVyV29yZHNTaGFyaW5nU3Vid29yZHMgPSBmbGF0dGVuKFxuICAgICAgc3Vid29yZHMubWFwKChzdWIpID0+IHtcbiAgICAgICAgY29uc3Qgb3RoZXJXb3Jkc1dpdGhTdWI6IHN0cmluZ1tdID0gYWRqYWNlbnRXb3Jkcy5maWx0ZXIoXG4gICAgICAgICAgKHRhcmdldCkgPT4gdGFyZ2V0ID09PSBzdWIsXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIG90aGVyV29yZHNXaXRoU3ViLm1hcCgob3RoZXJXb3JkKSA9PiAoe1xuICAgICAgICAgIHNvdXJjZTogd29yZCxcbiAgICAgICAgICB0YXJnZXQ6IG90aGVyV29yZCxcbiAgICAgICAgfSkpXG4gICAgICB9KSxcbiAgICApLmZpbHRlcigoeyBzb3VyY2UsIHRhcmdldCB9KSA9PiBzb3VyY2UgIT09IHRhcmdldClcbiAgICBsaW5rcyA9IGxpbmtzLmNvbmNhdChvdGhlcldvcmRzU2hhcmluZ1N1YndvcmRzKVxuICB9KVxuICBjb25zdCB1bmlxdWVMaW5rcyA9IGZpbHRlclVuaXF1ZUxpbmtzKGxpbmtzKVxuXG4gIHJldHVybiB7IGxpbmtzOiB1bmlxdWVMaW5rcywgbm9kZXMgfVxufVxuIl0sInZlcnNpb24iOjN9