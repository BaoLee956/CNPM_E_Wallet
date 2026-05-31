"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(); // Cho phép CORS để frontend có thể gọi API
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
    })); // Sử dụng ValidationPipe toàn cục
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`E-Wallet backend is set up and listening on port ${port}.`);
}
bootstrap();
