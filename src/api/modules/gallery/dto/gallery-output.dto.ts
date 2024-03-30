export default class GalleryOutputDto {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public author: string,
    public description: string,
  ) {}
}
