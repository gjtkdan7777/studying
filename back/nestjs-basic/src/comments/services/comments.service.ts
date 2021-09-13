import { CommentsCreateDto } from './../dtos/comments.create.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hi';
  }
  async createComment(id: string, comments: CommentsCreateDto) {
    return 'hello world';
  }

  async plusLike(id: string) {}
}
