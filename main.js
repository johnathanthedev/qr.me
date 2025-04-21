import dotenv from 'dotenv'
import QRCode from 'qrcode'
import sharp from 'sharp'

dotenv.config()

// === SETTINGS ===
const websiteURL = process.env.QR_LINK
const outputQR = 'public/qr.png'
const qrSize = 500         // QR image size
const borderSize = 40      // Extra white border around entire QR

const generateQR = async () => {
  try {
    // Generate QR code buffer
    const qrBuffer = await QRCode.toBuffer(websiteURL, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: qrSize,
      margin: 0,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      }
    })

    // Add white border around QR code
    const qrWithBorder = await sharp(qrBuffer)
      .extend({
        top: borderSize,
        bottom: borderSize,
        left: borderSize,
        right: borderSize,
        background: '#FFFFFF'
      })
      .toBuffer()

    await sharp(qrWithBorder).toFile(outputQR)

    console.log(`✅ QR code saved as "${outputQR}"`)
  } catch (err) {
    console.error('❌ Failed to generate QR code:', err)
  }
}

await generateQR()
