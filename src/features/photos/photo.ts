import { Photo } from '../../core/database/models/Photo';

export class PhotoService {
  async getRandomPhoto(type: 'morning' | 'evening'): Promise<Photo | null> {
    const photos = await Photo.findAll({
      where: { 
        type, 
        isActive: true 
      },
    });
    
    if (photos.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  }

  // Добавить новое фото
  async addPhoto(
    type: 'morning' | 'evening', 
    url: string, 
    caption?: string
  ): Promise<Photo> {
    return await Photo.create({
      type,
      url,
      caption,
      isActive: true,
    });
  }

  // Получить все фото
  async getAllPhotos() {
    return await Photo.findAll({
      order: [['type', 'ASC'], ['order', 'ASC']],
    });
  }
}