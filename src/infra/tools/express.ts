import { ControllerInterface, HttpRequest } from '@/domain/controllers/controller.interface'
import { obfuscateValue } from '@/shared/helpers/string.helper'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { prismaClient } from '../database/prisma-client'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req?.body,
      params: req?.params,
      query: req?.query,
    }

    const { statusCode, body } = await controller.execute(input)
    const output = statusCode >= 200 && statusCode <= 499 ? body : { error: body.message }

    await logRequest(req, input, statusCode, output)

    res.status(statusCode).json(output)
  }
}

const logRequest = async (req: Request, input: any, statusCode: number, output: any): Promise<void> => {
  await prismaClient.request.create({
    data: {
      id: randomUUID(),
      method: req.method,
      input: JSON.stringify(obfuscateValue({ ...input.body })),
      route: req.url,
      createdAt: new Date(),
      status: statusCode,
      output: JSON.stringify(output),
      updatedAt: new Date(),
    },
  })
}
