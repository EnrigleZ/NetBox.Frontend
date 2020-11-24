export function getExtension(filename: string = '') {
    const i = filename.lastIndexOf('.')
    return i < 0 ? '' : filename.substr(i + 1)
}
