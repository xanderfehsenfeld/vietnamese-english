"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    test('returns expected', function () {
        var _a = __1.getGraphDataForCompoundWord('rest room', {
            rest: ['rest easy', 'rest happily'],
            happily: ['happily married'],
        }), nodes = _a.nodes, links = _a.links;
        expect(nodes.map(function (_a) {
            var id = _a.id;
            return id;
        })).toEqual(['rest room']);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDakIsSUFBQTs7O1VBR0osRUFITSxnQkFBSyxFQUFFLGdCQUdiLENBQUE7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQU07Z0JBQUosVUFBRTtZQUFPLE9BQUEsRUFBRTtRQUFGLENBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUMxRCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy94YW5kZXJmZWhzZW5mZWxkL0Rlc2t0b3AvdmlldG5hbWVzZS1lbmdsaXNoL3NyYy9jbGllbnQvY29tcG9uZW50cy9Xb3JkR3JhcGgvbGliL19fdGVzdHNfXy9pbmRleC50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCB9IGZyb20gJy4uJ1xuXG5kZXNjcmliZShnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQubmFtZSwgKCkgPT4ge1xuICB0ZXN0KCdyZXR1cm5zIGV4cGVjdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgbm9kZXMsIGxpbmtzIH0gPSBnZXRHcmFwaERhdGFGb3JDb21wb3VuZFdvcmQoJ3Jlc3Qgcm9vbScsIHtcbiAgICAgIHJlc3Q6IFsncmVzdCBlYXN5JywgJ3Jlc3QgaGFwcGlseSddLFxuICAgICAgaGFwcGlseTogWydoYXBwaWx5IG1hcnJpZWQnXSxcbiAgICB9KVxuXG4gICAgZXhwZWN0KG5vZGVzLm1hcCgoeyBpZCB9KSA9PiBpZCkpLnRvRXF1YWwoWydyZXN0IHJvb20nXSlcbiAgfSlcbn0pXG4iXSwidmVyc2lvbiI6M30=