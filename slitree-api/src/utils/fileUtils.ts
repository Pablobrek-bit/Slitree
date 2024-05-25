export function checkFileSize(fileSizeInBytes: number) {
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

  if (fileSizeInMegabytes > 5) {
    return false;
  }

  return true;
}

export function isImage(mimeType: string) {
  return mimeType.includes('image');
}
