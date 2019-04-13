"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    var _a = __1.getGraphDataForCompoundWord('rest room', {
        rest: ['rest easy', 'rest happily'],
        happily: ['happily married'],
    }), nodes = _a.nodes, links = _a.links;
    it('returns expected nodes', function () {
        var wordsInNodes = nodes.map(function (_a) {
            var id = _a.id;
            return id;
        });
        var expectedItems = ['rest room', 'rest easy', 'rest happily'];
        expectedItems.forEach(function (expectedItem) {
            return expect(wordsInNodes).toContain(expectedItem);
        });
        var notExpected = ['room', 'happily married'];
        notExpected.forEach(function (notExpectedItem) {
            return expect(wordsInNodes).not.toContain(notExpectedItem);
        });
    });
    it('returns expected links', function () {
        expect(links).toBeUndefined();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFBOzs7TUFHSixFQUhNLGdCQUFLLEVBQUUsZ0JBR2IsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ2hFLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ2pDLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFBNUMsQ0FBNEMsQ0FDN0MsQ0FBQTtRQUVELElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFFL0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLGVBQWU7WUFDbEMsT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFBbkQsQ0FBbUQsQ0FDcEQsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy94YW5kZXJmZWhzZW5mZWxkL0Rlc2t0b3AvdmlldG5hbWVzZS1lbmdsaXNoL3NyYy9jbGllbnQvY29tcG9uZW50cy9Xb3JkR3JhcGgvbGliL19fdGVzdHNfXy9pbmRleC50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCB9IGZyb20gJy4uJ1xuXG5kZXNjcmliZShnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQubmFtZSwgKCkgPT4ge1xuICBjb25zdCB7IG5vZGVzLCBsaW5rcyB9ID0gZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkKCdyZXN0IHJvb20nLCB7XG4gICAgcmVzdDogWydyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5J10sXG4gICAgaGFwcGlseTogWydoYXBwaWx5IG1hcnJpZWQnXSxcbiAgfSlcblxuICBpdCgncmV0dXJucyBleHBlY3RlZCBub2RlcycsICgpID0+IHtcbiAgICBjb25zdCB3b3Jkc0luTm9kZXMgPSBub2Rlcy5tYXAoKHsgaWQgfSkgPT4gaWQpXG5cbiAgICBjb25zdCBleHBlY3RlZEl0ZW1zID0gWydyZXN0IHJvb20nLCAncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseSddXG4gICAgZXhwZWN0ZWRJdGVtcy5mb3JFYWNoKChleHBlY3RlZEl0ZW0pID0+XG4gICAgICBleHBlY3Qod29yZHNJbk5vZGVzKS50b0NvbnRhaW4oZXhwZWN0ZWRJdGVtKSxcbiAgICApXG5cbiAgICBjb25zdCBub3RFeHBlY3RlZCA9IFsncm9vbScsICdoYXBwaWx5IG1hcnJpZWQnXVxuXG4gICAgbm90RXhwZWN0ZWQuZm9yRWFjaCgobm90RXhwZWN0ZWRJdGVtKSA9PlxuICAgICAgZXhwZWN0KHdvcmRzSW5Ob2Rlcykubm90LnRvQ29udGFpbihub3RFeHBlY3RlZEl0ZW0pLFxuICAgIClcbiAgfSlcblxuICBpdCgncmV0dXJucyBleHBlY3RlZCBsaW5rcycsICgpID0+IHtcbiAgICBleHBlY3QobGlua3MpLnRvQmVVbmRlZmluZWQoKVxuICB9KVxufSlcbiJdLCJ2ZXJzaW9uIjozfQ==