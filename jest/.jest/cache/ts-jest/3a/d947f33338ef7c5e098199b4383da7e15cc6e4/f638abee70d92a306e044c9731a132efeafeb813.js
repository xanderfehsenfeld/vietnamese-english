"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    test('returns expected', function () {
        var _a = __1.getGraphDataForCompoundWord('rest room', {
            rest: ['rest easy', 'rest happily'],
            happily: ['happily married'],
        }), nodes = _a.nodes, links = _a.links;
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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDakIsSUFBQTs7O1VBR0osRUFITSxnQkFBSyxFQUFFLGdCQUdiLENBQUE7UUFFRixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ2hFLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ2pDLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFBNUMsQ0FBNEMsQ0FDN0MsQ0FBQTtRQUVELElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFFL0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLGVBQWU7WUFDbEMsT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFBbkQsQ0FBbUQsQ0FDcEQsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIHRlc3QoJ3JldHVybnMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlcywgbGlua3MgfSA9IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCgncmVzdCByb29tJywge1xuICAgICAgcmVzdDogWydyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5J10sXG4gICAgICBoYXBwaWx5OiBbJ2hhcHBpbHkgbWFycmllZCddLFxuICAgIH0pXG5cbiAgICBjb25zdCB3b3Jkc0luTm9kZXMgPSBub2Rlcy5tYXAoKHsgaWQgfSkgPT4gaWQpXG5cbiAgICBjb25zdCBleHBlY3RlZEl0ZW1zID0gWydyZXN0IHJvb20nLCAncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseSddXG4gICAgZXhwZWN0ZWRJdGVtcy5mb3JFYWNoKChleHBlY3RlZEl0ZW0pID0+XG4gICAgICBleHBlY3Qod29yZHNJbk5vZGVzKS50b0NvbnRhaW4oZXhwZWN0ZWRJdGVtKSxcbiAgICApXG5cbiAgICBjb25zdCBub3RFeHBlY3RlZCA9IFsncm9vbScsICdoYXBwaWx5IG1hcnJpZWQnXVxuXG4gICAgbm90RXhwZWN0ZWQuZm9yRWFjaCgobm90RXhwZWN0ZWRJdGVtKSA9PlxuICAgICAgZXhwZWN0KHdvcmRzSW5Ob2Rlcykubm90LnRvQ29udGFpbihub3RFeHBlY3RlZEl0ZW0pLFxuICAgIClcbiAgfSlcbn0pXG4iXSwidmVyc2lvbiI6M30=