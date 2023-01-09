import * as jwt from 'jsonwebtoken';

export const createToken = (payload: string): string => jwt.sign(payload, process.env.JWTKEY as string);
