import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { Book } from 'src/books/books.entity';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class QrcodeService {
    async generateQrData(data: string): Promise<string> {
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(data);
            return qrCodeDataUrl;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Failed to generate QR code');
        }
    }
}
