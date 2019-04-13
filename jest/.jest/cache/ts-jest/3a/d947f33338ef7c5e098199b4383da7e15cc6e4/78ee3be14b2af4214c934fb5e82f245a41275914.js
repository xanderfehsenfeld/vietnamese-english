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
            hiddenAdjacentNodes: ['happily', 'happily married'],
        });
    });
    it('returns expected links', function () {
        var link = links.find(function (v) { return v.source === 'rest room' && v.target === 'rest'; });
        expect(link).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFBOzs7TUFHSixFQUhNLGdCQUFLLEVBQUUsZ0JBR2IsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUNqQyxPQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQTVDLENBQTRDLENBQzdDLENBQUE7UUFFRCxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUUxRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsZUFBZTtZQUNsQyxPQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztRQUFuRCxDQUFtRCxDQUNwRCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsSUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssY0FBYyxFQUF2QixDQUF1QixDQUFDLENBQUE7UUFDbEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNwQyxFQUFFLEVBQUUsY0FBYztZQUNsQixtQkFBbUIsRUFBRSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztTQUNwRCxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNyQixVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUEvQyxDQUErQyxDQUN2RCxDQUFBO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIGNvbnN0IHsgbm9kZXMsIGxpbmtzIH0gPSBnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQoJ3Jlc3Qgcm9vbScsIHtcbiAgICByZXN0OiBbJ3Jlc3QgZWFzeScsICdyZXN0IGhhcHBpbHknLCAncmVzdCByb29tJ10sXG4gICAgaGFwcGlseTogWydoYXBwaWx5IG1hcnJpZWQnLCAncmVzdCBoYXBwaWx5J10sXG4gIH0pXG5cbiAgaXQoJ3JldHVybnMgZXhwZWN0ZWQgbm9kZXMnLCAoKSA9PiB7XG4gICAgY29uc3Qgd29yZHNJbk5vZGVzID0gbm9kZXMubWFwKCh7IGlkIH0pID0+IGlkKVxuXG4gICAgY29uc3QgZXhwZWN0ZWRJdGVtcyA9IFsncmVzdCByb29tJywgJ3Jlc3QgZWFzeScsICdyZXN0IGhhcHBpbHknLCAncmVzdCddXG4gICAgZXhwZWN0ZWRJdGVtcy5mb3JFYWNoKChleHBlY3RlZEl0ZW0pID0+XG4gICAgICBleHBlY3Qod29yZHNJbk5vZGVzKS50b0NvbnRhaW4oZXhwZWN0ZWRJdGVtKSxcbiAgICApXG5cbiAgICBjb25zdCBub3RFeHBlY3RlZCA9IFsncm9vbScsICdoYXBwaWx5IG1hcnJpZWQnLCAnaGFwcGlseSddXG5cbiAgICBub3RFeHBlY3RlZC5mb3JFYWNoKChub3RFeHBlY3RlZEl0ZW0pID0+XG4gICAgICBleHBlY3Qod29yZHNJbk5vZGVzKS5ub3QudG9Db250YWluKG5vdEV4cGVjdGVkSXRlbSksXG4gICAgKVxuICB9KVxuXG4gIGl0KCdpbmNsdWRlcyBoaWRkZW4gYWRqYWNlbnQgbm9kZXMgaWYgdGhlcmUgYXJlIGFueScsICgpID0+IHtcbiAgICBjb25zdCByZXN0SGFwcGlseU5vZGUgPSBub2Rlcy5maW5kKCh2KSA9PiB2LmlkID09PSAncmVzdCBoYXBwaWx5JylcbiAgICBleHBlY3QocmVzdEhhcHBpbHlOb2RlKS50b01hdGNoT2JqZWN0KHtcbiAgICAgIGlkOiAncmVzdCBoYXBwaWx5JyxcbiAgICAgIGhpZGRlbkFkamFjZW50Tm9kZXM6IFsnaGFwcGlseScsICdoYXBwaWx5IG1hcnJpZWQnXSxcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdyZXR1cm5zIGV4cGVjdGVkIGxpbmtzJywgKCkgPT4ge1xuICAgIGNvbnN0IGxpbmsgPSBsaW5rcy5maW5kKFxuICAgICAgKHYpID0+IHYuc291cmNlID09PSAncmVzdCByb29tJyAmJiB2LnRhcmdldCA9PT0gJ3Jlc3QnLFxuICAgIClcbiAgICBleHBlY3QobGluaykudG9CZURlZmluZWQoKVxuICB9KVxufSlcbiJdLCJ2ZXJzaW9uIjozfQ==