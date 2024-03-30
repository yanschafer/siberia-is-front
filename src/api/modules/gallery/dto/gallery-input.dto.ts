export default class GalleryInputDto {
  constructor(
    public photoName: string,
    public name: string,
    public imageBase64: string,
    public description: string,
  ) {}
}
