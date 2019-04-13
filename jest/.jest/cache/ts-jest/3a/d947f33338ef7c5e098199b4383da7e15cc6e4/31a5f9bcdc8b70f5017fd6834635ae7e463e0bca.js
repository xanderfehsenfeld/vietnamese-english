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
        })).toContain('');
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDakIsSUFBQTs7O1VBR0osRUFITSxnQkFBSyxFQUFFLGdCQUdiLENBQUE7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQU07Z0JBQUosVUFBRTtZQUFPLE9BQUEsRUFBRTtRQUFGLENBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIHRlc3QoJ3JldHVybnMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlcywgbGlua3MgfSA9IGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZCgncmVzdCByb29tJywge1xuICAgICAgcmVzdDogWydyZXN0IGVhc3knLCAncmVzdCBoYXBwaWx5J10sXG4gICAgICBoYXBwaWx5OiBbJ2hhcHBpbHkgbWFycmllZCddLFxuICAgIH0pXG5cbiAgICBleHBlY3Qobm9kZXMubWFwKCh7IGlkIH0pID0+IGlkKSkudG9Db250YWluKCcnKVxuICB9KVxufSlcbiJdLCJ2ZXJzaW9uIjozfQ==