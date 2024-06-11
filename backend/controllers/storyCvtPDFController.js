// 导入相关模块和控制器
const pdf = require('html-pdf');
const cheerio = require('cheerio');
const fs = require('fs');
const path=require('path')


exports.storyConvertPDF =async (req, res) => {
    const htmlContent = formatPdf(req.body.html);
    fs.writeFileSync('output.html', htmlContent);
    const options = { format: 'Letter' };

    // Generate PDF from HTML content
    pdf.create(htmlContent, options).toBuffer(function(err, buffer) {
        if (err) {
            console.error(err);
            res.status(500).send("Error generating PDF");
        } else {
            // Set response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

            // Send the PDF buffer as response
            res.send(buffer);
        }
    });
};


const imageToBase64 = (filePath) => {
    try {
        const image = fs.readFileSync(filePath);
        const base64Image = Buffer.from(image).toString('base64');
        const mimeType = `image/${path.extname(filePath).slice(1)}`; // Derive mime type from file extension
        return `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
        console.error('Error converting image to Base64:', error);
        return null;
    }
};


const formatPdf = (htmlStr) => {

    // Convert images to Base64
    const headerBase64 = imageToBase64('assets/imgs/headers.png');
    const nerdBase64 = imageToBase64('assets/imgs/nerd.png');

    // Creating the header
    const header = `
    <div style="background-image: url('${headerBase64}'); padding-left: 30px; background-size: cover; background-position: center; height: 50px; display: flex; align-items: center; text-align: left; color: white; font-size: 35px; font-family: Kodchasan; margin-bottom: 15px; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">Social Story</div>
    `;

    // Creating the image and text section
    const imageAndText = `
    <table style=" margin:20px; width: 100%; border-collapse: collapse;">
    <tr>
        <td style="width: 80px; text-align: center;">
            <img src="${nerdBase64}" style="max-width: 80px; max-height: 80px;">
        </td>
        <td style="font-size: 24px; font-family: Kodchasan; padding-left: 10px;">
            <div style="margin-bottom: 10px;">Student</div>
            <div>Scenario</div>
        </td>
    </tr>
</table>



    `;

    // Creating the objective section
    const objective = `
    <div style="background-color: #C0CAE2; padding: 10px; color: black; font-size: 20px; font-family: Kodchasan; text-align: left; margin: 15px 30px;">Objective</div>
    `;
    const $ = cheerio.load(htmlStr);
    // Replace '\n\n' with <p> tags
    $('body').html($('body').html().replace(/\n\n/g, '</p><p class="PlaygroundEditorTheme__paragraph" dir="ltr">'));

    $('p.PlaygroundEditorTheme__paragraph').each((index, element) => {
        const text = $(element).text().trim();
        if (!text) {
            $(element).remove();
        }
    });
    
    // Apply CSS styles to <p> tags with non-empty text content
    $('p.PlaygroundEditorTheme__paragraph').css({
        'border': '2px solid darkgray',
        'border-radius': '5px',
        'padding': '20px',
        'margin': '5px 30px'
    });

    // Get the modified HTML content
    const modifiedHtml = $.html();

    // Combining all sections
    const newHtmlContent = `${header}\n${imageAndText}\n${objective}\n${modifiedHtml}`;
    // Save the result to a file
    fs.writeFileSync('output.html', newHtmlContent);
    return newHtmlContent;
}
