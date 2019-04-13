"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    var _a = __1.getGraphDataForCompoundWord('rest room', {
        rest: ['rest easy', 'rest happily'],
        happily: ['happily married'],
    }), nodes = _a.nodes, links = _a.links;
    test('returns expected nodes', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFBOzs7TUFHSixFQUhNLGdCQUFLLEVBQUUsZ0JBR2IsQ0FBQTtJQUVGLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtRQUM3QixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ2hFLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ2pDLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFBNUMsQ0FBNEMsQ0FDN0MsQ0FBQTtRQUVELElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFFL0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLGVBQWU7WUFDbEMsT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFBbkQsQ0FBbUQsQ0FDcEQsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIGNvbnN0IHsgbm9kZXMsIGxpbmtzIH0gPSBnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQoJ3Jlc3Qgcm9vbScsIHtcbiAgICByZXN0OiBbJ3Jlc3QgZWFzeScsICdyZXN0IGhhcHBpbHknXSxcbiAgICBoYXBwaWx5OiBbJ2hhcHBpbHkgbWFycmllZCddLFxuICB9KVxuXG4gIHRlc3QoJ3JldHVybnMgZXhwZWN0ZWQgbm9kZXMnLCAoKSA9PiB7XG4gICAgY29uc3Qgd29yZHNJbk5vZGVzID0gbm9kZXMubWFwKCh7IGlkIH0pID0+IGlkKVxuXG4gICAgY29uc3QgZXhwZWN0ZWRJdGVtcyA9IFsncmVzdCByb29tJywgJ3Jlc3QgZWFzeScsICdyZXN0IGhhcHBpbHknXVxuICAgIGV4cGVjdGVkSXRlbXMuZm9yRWFjaCgoZXhwZWN0ZWRJdGVtKSA9PlxuICAgICAgZXhwZWN0KHdvcmRzSW5Ob2RlcykudG9Db250YWluKGV4cGVjdGVkSXRlbSksXG4gICAgKVxuXG4gICAgY29uc3Qgbm90RXhwZWN0ZWQgPSBbJ3Jvb20nLCAnaGFwcGlseSBtYXJyaWVkJ11cblxuICAgIG5vdEV4cGVjdGVkLmZvckVhY2goKG5vdEV4cGVjdGVkSXRlbSkgPT5cbiAgICAgIGV4cGVjdCh3b3Jkc0luTm9kZXMpLm5vdC50b0NvbnRhaW4obm90RXhwZWN0ZWRJdGVtKSxcbiAgICApXG4gIH0pXG59KVxuIl0sInZlcnNpb24iOjN9