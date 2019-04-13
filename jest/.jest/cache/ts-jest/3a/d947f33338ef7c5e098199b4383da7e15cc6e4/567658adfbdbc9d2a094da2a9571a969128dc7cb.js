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
        var notExpected = ['room', 'happily married'];
        notExpected.forEach(function (notExpectedItem) {
            return expect(wordsInNodes).not.toContain(notExpectedItem);
        });
    });
    it('includes hidden adjacent nodes if there are any', function () {
        var restHappilyNode = nodes.find(function (v) { return v.id === 'rest happily'; });
        expect(restHappilyNode).toMatchObject({ id: 'rest happily' });
    });
    it('returns expected links', function () {
        var link = links.find(function (v) { return v.source === 'rest room' && v.target === 'rest'; });
        expect(link).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFBOzs7TUFHSixFQUhNLGdCQUFLLEVBQUUsZ0JBR2IsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBTTtnQkFBSixVQUFFO1lBQU8sT0FBQSxFQUFFO1FBQUYsQ0FBRSxDQUFDLENBQUE7UUFFOUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUNqQyxPQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQTVDLENBQTRDLENBQzdDLENBQUE7UUFFRCxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBRS9DLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxlQUFlO1lBQ2xDLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO1FBQW5ELENBQW1ELENBQ3BELENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtRQUNwRCxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxjQUFjLEVBQXZCLENBQXVCLENBQUMsQ0FBQTtRQUNsRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7SUFDL0QsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsd0JBQXdCLEVBQUU7UUFDM0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDckIsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBL0MsQ0FBK0MsQ0FDdkQsQ0FBQTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM1QixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy94YW5kZXJmZWhzZW5mZWxkL0Rlc2t0b3AvdmlldG5hbWVzZS1lbmdsaXNoL3NyYy9jbGllbnQvY29tcG9uZW50cy9Xb3JkR3JhcGgvbGliL19fdGVzdHNfXy9pbmRleC50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCB9IGZyb20gJy4uJ1xuXG5kZXNjcmliZShnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQubmFtZSwgKCkgPT4ge1xuICBjb25zdCB7IG5vZGVzLCBsaW5rcyB9ID0gZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkKCdyZXN0IHJvb20nLCB7XG4gICAgcmVzdDogWydyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5JywgJ3Jlc3Qgcm9vbSddLFxuICAgIGhhcHBpbHk6IFsnaGFwcGlseSBtYXJyaWVkJywgJ3Jlc3QgaGFwcGlseSddLFxuICB9KVxuXG4gIGl0KCdyZXR1cm5zIGV4cGVjdGVkIG5vZGVzJywgKCkgPT4ge1xuICAgIGNvbnN0IHdvcmRzSW5Ob2RlcyA9IG5vZGVzLm1hcCgoeyBpZCB9KSA9PiBpZClcblxuICAgIGNvbnN0IGV4cGVjdGVkSXRlbXMgPSBbJ3Jlc3Qgcm9vbScsICdyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5JywgJ3Jlc3QnXVxuICAgIGV4cGVjdGVkSXRlbXMuZm9yRWFjaCgoZXhwZWN0ZWRJdGVtKSA9PlxuICAgICAgZXhwZWN0KHdvcmRzSW5Ob2RlcykudG9Db250YWluKGV4cGVjdGVkSXRlbSksXG4gICAgKVxuXG4gICAgY29uc3Qgbm90RXhwZWN0ZWQgPSBbJ3Jvb20nLCAnaGFwcGlseSBtYXJyaWVkJ11cblxuICAgIG5vdEV4cGVjdGVkLmZvckVhY2goKG5vdEV4cGVjdGVkSXRlbSkgPT5cbiAgICAgIGV4cGVjdCh3b3Jkc0luTm9kZXMpLm5vdC50b0NvbnRhaW4obm90RXhwZWN0ZWRJdGVtKSxcbiAgICApXG4gIH0pXG5cbiAgaXQoJ2luY2x1ZGVzIGhpZGRlbiBhZGphY2VudCBub2RlcyBpZiB0aGVyZSBhcmUgYW55JywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RIYXBwaWx5Tm9kZSA9IG5vZGVzLmZpbmQoKHYpID0+IHYuaWQgPT09ICdyZXN0IGhhcHBpbHknKVxuICAgIGV4cGVjdChyZXN0SGFwcGlseU5vZGUpLnRvTWF0Y2hPYmplY3QoeyBpZDogJ3Jlc3QgaGFwcGlseScgfSlcbiAgfSlcblxuICBpdCgncmV0dXJucyBleHBlY3RlZCBsaW5rcycsICgpID0+IHtcbiAgICBjb25zdCBsaW5rID0gbGlua3MuZmluZChcbiAgICAgICh2KSA9PiB2LnNvdXJjZSA9PT0gJ3Jlc3Qgcm9vbScgJiYgdi50YXJnZXQgPT09ICdyZXN0JyxcbiAgICApXG4gICAgZXhwZWN0KGxpbmspLnRvQmVEZWZpbmVkKClcbiAgfSlcbn0pXG4iXSwidmVyc2lvbiI6M30=