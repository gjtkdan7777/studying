import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Board')
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`)
    return this.boardService.getAllBoards(user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    const payload = JSON.stringify(createBoardDto)
    this.logger.verbose(
      `User ${user.username} creating a new board. Payload: ${payload}`
    )
    return this.boardService.createBoard(createBoardDto, user)
  }

  @Get('/:id')
  getBoardByid(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardService.updateBoardStatus(id, status)
  }
}
