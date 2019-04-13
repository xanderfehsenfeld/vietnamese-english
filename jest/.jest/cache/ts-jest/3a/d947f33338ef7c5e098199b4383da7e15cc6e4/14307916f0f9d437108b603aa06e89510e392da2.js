"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe(__1.getGraphDataForCompoundWord.name, function () {
    test('returns expected', function () {
        var result = __1.getGraphDataForCompoundWord('rest room', {
            rest: ['easy', 'happily'],
            happily: ['happily married'],
        });
        expect(result).toBeUndefined();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBZ0Q7QUFFaEQsUUFBUSxDQUFDLCtCQUEyQixDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDdkIsSUFBTSxNQUFNLEdBQUcsK0JBQTJCLENBQUMsV0FBVyxFQUFFO1lBQ3RELElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7U0FDN0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2hDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL3hhbmRlcmZlaHNlbmZlbGQvRGVza3RvcC92aWV0bmFtZXNlLWVuZ2xpc2gvc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmRHcmFwaC9saWIvX190ZXN0c19fL2luZGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkIH0gZnJvbSAnLi4nXG5cbmRlc2NyaWJlKGdldEdyYXBoRGF0YUZvckNvbXBvdW5kV29yZC5uYW1lLCAoKSA9PiB7XG4gIHRlc3QoJ3JldHVybnMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JhcGhEYXRhRm9yQ29tcG91bmRXb3JkKCdyZXN0IHJvb20nLCB7XG4gICAgICByZXN0OiBbJ2Vhc3knLCAnaGFwcGlseSddLFxuICAgICAgaGFwcGlseTogWydoYXBwaWx5IG1hcnJpZWQnXSxcbiAgICB9KVxuXG4gICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpXG4gIH0pXG59KVxuIl0sInZlcnNpb24iOjN9