import QRCode from 'qrcode';

export const qrHelper = {
  /**
   * Generates Data URL for QR Code
   * @param {string} text
   * @returns {Promise<string>}
   */
  async generateQRDataURL(text) {
    try {
      return await QRCode.toDataURL(text, { width: 300, margin: 2 });
    } catch (err) {
      console.error('Failed to generate QR code', err);
      return '';
    }
  }
};
