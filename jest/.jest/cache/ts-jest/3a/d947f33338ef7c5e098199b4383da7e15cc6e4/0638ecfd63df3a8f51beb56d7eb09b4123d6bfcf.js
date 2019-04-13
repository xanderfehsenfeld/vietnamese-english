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
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDakIsSUFBQTs7O1VBR0osRUFITSxnQkFBSyxFQUFFLGdCQUdiLENBQUE7UUFFRixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ2hFLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ2pDLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFBNUMsQ0FBNEMsQ0FDN0MsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIHRlc3QoJ3JldHVybnMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlcywgbGlua3MgfSA9IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCgncmVzdCByb29tJywge1xuICAgICAgcmVzdDogWydyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5J10sXG4gICAgICBoYXBwaWx5OiBbJ2hhcHBpbHkgbWFycmllZCddLFxuICAgIH0pXG5cbiAgICBjb25zdCB3b3Jkc0luTm9kZXMgPSBub2Rlcy5tYXAoKHsgaWQgfSkgPT4gaWQpXG5cbiAgICBjb25zdCBleHBlY3RlZEl0ZW1zID0gWydyZXN0IHJvb20nLCAncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseSddXG4gICAgZXhwZWN0ZWRJdGVtcy5mb3JFYWNoKChleHBlY3RlZEl0ZW0pID0+XG4gICAgICBleHBlY3Qod29yZHNJbk5vZGVzKS50b0NvbnRhaW4oZXhwZWN0ZWRJdGVtKSxcbiAgICApXG4gIH0pXG59KVxuIl0sInZlcnNpb24iOjN9