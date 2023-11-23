"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const SWAGGER_API_ROOT = 'api/docs';
    const SWAGGER_API_NAME = 'API';
    const SWAGGER_API_DESCRIPTION = 'API Description';
    const SWAGGER_API_CURRENT_VERSION = '1.0';
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: '*',
        methods: 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
        credentials: true,
    });
    app.enableShutdownHooks();
    const options = new swagger_1.DocumentBuilder()
        .setTitle(SWAGGER_API_NAME)
        .setDescription(SWAGGER_API_DESCRIPTION)
        .setVersion(SWAGGER_API_CURRENT_VERSION)
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map