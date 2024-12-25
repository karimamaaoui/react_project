"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLikeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_like_dto_1 = require("./create-like.dto");
class UpdateLikeDto extends (0, swagger_1.PartialType)(create_like_dto_1.CreateLikeDto) {
}
exports.UpdateLikeDto = UpdateLikeDto;
//# sourceMappingURL=update-like.dto.js.map