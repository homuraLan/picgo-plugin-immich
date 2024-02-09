interface FileInfo {
    buffer: Buffer;
    fileName: string;
    width: number;
    height: number;
    extname: string;
    fileFullPath: string;
    filePath: string;
}
export interface seekFileInfo {
    [key: string]: FileInfo;
}

//input ,output
export async function findFileName(input: string[], output: any[]): Promise<{ [key: string]: FileInfo }> {
    const dictionary: { [key: string]: FileInfo } = {};

    for (let i = 0; i < input.length; i++) {
        const inputFileName: string = (input[i].split('\\').pop() as string) || '';

        for (let j = 0; j < output.length; j++) {
            const outputFileName = output[j]?.fileName; // 使用可选链运算符

            if (outputFileName && inputFileName === outputFileName) {
                dictionary[inputFileName] = {
                    buffer: output[j].buffer,
                    fileName: outputFileName,
                    width: output[j].width,
                    height: output[j].height,
                    extname: output[j].extname,
                    fileFullPath: input[i],
                    filePath: input[i].split('\\').slice(0, -1).join('\\')
                };
                break;
            }
        }
    }

    return dictionary;
}
