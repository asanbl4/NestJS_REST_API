import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/roles.enums';

@Controller('qrcode')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Moderator)
export class QrcodeController {
    constructor(private readonly qrcodeService: QrcodeService) {}

    @Get()
    async generateQrCode(): Promise<string> {
        const qrCodeDataUrl = await this.qrcodeService.generateQrData(`
        title:test\n
        author:authortest\n
        year:2024\n
        description:this is a test description...
    `);
        return `<img src="${qrCodeDataUrl}" alt="QR code" />`;
    }
}
