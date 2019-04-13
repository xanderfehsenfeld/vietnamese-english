"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    var _a = __1.getGraphDataForCompoundWord('rest room', {
        rest: ['rest easy', 'rest happily', 'rest room'],
        happily: ['happily married', 'rest happily'],
    }), nodes = _a.nodes, links = _a.links;
    it('returns expected nodes', function () {
        var wordsInNodes = nodes.map(function (_a) {
            var id = _a.id;
            return id;
        });
        var expectedItems = ['rest room', 'rest easy', 'rest happily', 'rest'];
        expectedItems.forEach(function (expectedItem) {
            return expect(wordsInNodes).toContain(expectedItem);
        });
        var notExpected = ['room', 'happily married', 'happily'];
        notExpected.forEach(function (notExpectedItem) {
            return expect(wordsInNodes).not.toContain(notExpectedItem);
        });
    });
    it('includes hidden adjacent nodes if there are any', function () {
        var restHappilyNode = nodes.find(function (v) { return v.id === 'rest happily'; });
        expect(restHappilyNode).toMatchObject({
            id: 'rest happily',
            hiddenAdjacentNodes: ['happily married', 'happily'],
            color: 'green',
        });
    });
    it('returns expected links', function () {
        var link = links.find(function (v) { return v.source === 'rest room' && v.target === 'rest'; });
        expect(link).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFBOzs7TUFHSixFQUhNLGdCQUFLLEVBQUUsZ0JBR2IsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUNqQyxPQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQTVDLENBQTRDLENBQzdDLENBQUE7UUFFRCxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUUxRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsZUFBZTtZQUNsQyxPQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztRQUFuRCxDQUFtRCxDQUNwRCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsSUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssY0FBYyxFQUF2QixDQUF1QixDQUFDLENBQUE7UUFDbEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNwQyxFQUFFLEVBQUUsY0FBYztZQUNsQixtQkFBbUIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQztZQUNuRCxLQUFLLEVBQUUsT0FBTztTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1FBQzNCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3JCLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQS9DLENBQStDLENBQ3ZELENBQUE7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMveGFuZGVyZmVoc2VuZmVsZC9EZXNrdG9wL3ZpZXRuYW1lc2UtZW5nbGlzaC9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29yZEdyYXBoL2xpYi9fX3Rlc3RzX18vaW5kZXgudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQgfSBmcm9tICcuLidcblxuZGVzY3JpYmUoZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkLm5hbWUsICgpID0+IHtcbiAgY29uc3QgeyBub2RlcywgbGlua3MgfSA9IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCgncmVzdCByb29tJywge1xuICAgIHJlc3Q6IFsncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseScsICdyZXN0IHJvb20nXSxcbiAgICBoYXBwaWx5OiBbJ2hhcHBpbHkgbWFycmllZCcsICdyZXN0IGhhcHBpbHknXSxcbiAgfSlcblxuICBpdCgncmV0dXJucyBleHBlY3RlZCBub2RlcycsICgpID0+IHtcbiAgICBjb25zdCB3b3Jkc0luTm9kZXMgPSBub2Rlcy5tYXAoKHsgaWQgfSkgPT4gaWQpXG5cbiAgICBjb25zdCBleHBlY3RlZEl0ZW1zID0gWydyZXN0IHJvb20nLCAncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseScsICdyZXN0J11cbiAgICBleHBlY3RlZEl0ZW1zLmZvckVhY2goKGV4cGVjdGVkSXRlbSkgPT5cbiAgICAgIGV4cGVjdCh3b3Jkc0luTm9kZXMpLnRvQ29udGFpbihleHBlY3RlZEl0ZW0pLFxuICAgIClcblxuICAgIGNvbnN0IG5vdEV4cGVjdGVkID0gWydyb29tJywgJ2hhcHBpbHkgbWFycmllZCcsICdoYXBwaWx5J11cblxuICAgIG5vdEV4cGVjdGVkLmZvckVhY2goKG5vdEV4cGVjdGVkSXRlbSkgPT5cbiAgICAgIGV4cGVjdCh3b3Jkc0luTm9kZXMpLm5vdC50b0NvbnRhaW4obm90RXhwZWN0ZWRJdGVtKSxcbiAgICApXG4gIH0pXG5cbiAgaXQoJ2luY2x1ZGVzIGhpZGRlbiBhZGphY2VudCBub2RlcyBpZiB0aGVyZSBhcmUgYW55JywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RIYXBwaWx5Tm9kZSA9IG5vZGVzLmZpbmQoKHYpID0+IHYuaWQgPT09ICdyZXN0IGhhcHBpbHknKVxuICAgIGV4cGVjdChyZXN0SGFwcGlseU5vZGUpLnRvTWF0Y2hPYmplY3Qoe1xuICAgICAgaWQ6ICdyZXN0IGhhcHBpbHknLFxuICAgICAgaGlkZGVuQWRqYWNlbnROb2RlczogWydoYXBwaWx5IG1hcnJpZWQnLCAnaGFwcGlseSddLFxuICAgICAgY29sb3I6ICdncmVlbicsXG4gICAgfSlcbiAgfSlcblxuICBpdCgncmV0dXJucyBleHBlY3RlZCBsaW5rcycsICgpID0+IHtcbiAgICBjb25zdCBsaW5rID0gbGlua3MuZmluZChcbiAgICAgICh2KSA9PiB2LnNvdXJjZSA9PT0gJ3Jlc3Qgcm9vbScgJiYgdi50YXJnZXQgPT09ICdyZXN0JyxcbiAgICApXG4gICAgZXhwZWN0KGxpbmspLnRvQmVEZWZpbmVkKClcbiAgfSlcbn0pXG4iXSwidmVyc2lvbiI6M30=