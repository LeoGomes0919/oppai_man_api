import { Router } from 'express'
import multer from 'multer'
import { CreateGameController } from '../controllers/CreateGameController'
import { UpdateGameController } from '../controllers/UpdateGameController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'
import { ensureDeveloper } from '@/shared/infra/http/middlewares/ensureDeveloper'
import { DeleteGameController } from '../controllers/DeleteGameController'
import { FindAllWithFiltersController } from '../controllers/FindAllWithFiltersController'
import { FindGameByIdController } from '../controllers/FindGameByIdController'
import { UploadGameImagesController } from '../controllers/UploadGameImagesController'
import uploadConfig from '@/config/upload'
import { FindAllByDeveloperController } from '../controllers/FindAllByDeveloperController'

const gamesRoutes = Router()

const upload = multer(uploadConfig)

const createGameController = new CreateGameController()
const updateGameController = new UpdateGameController()
const uploadGameImagesController = new UploadGameImagesController()
const deleteGameController = new DeleteGameController()
const findAllWithFiltersController = new FindAllWithFiltersController()
const findGameByIdController = new FindGameByIdController()
const findAllByDeveloperController = new FindAllByDeveloperController()

// Developer routes
gamesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureDeveloper,
  createGameController.handle,
)
gamesRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureDeveloper,
  updateGameController.handle,
)

gamesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureDeveloper,
  deleteGameController.handle,
)

gamesRoutes.patch(
  '/upload/images/:id',
  ensureAuthenticated,
  ensureDeveloper,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'header_image', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 },
  ]),
  uploadGameImagesController.handle,
)

gamesRoutes.get(
  '/my-games',
  ensureAuthenticated,
  ensureDeveloper,
  findAllByDeveloperController.handle,
)

// Public routes
gamesRoutes.get('/', findAllWithFiltersController.handle)
gamesRoutes.get('/:id', findGameByIdController.handle)

export { gamesRoutes }
