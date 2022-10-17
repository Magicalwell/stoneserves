import { Injectable } from '@nestjs/common';
import { validPhone, validEmail } from '../../utils/validate';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ResultData } from '../../utils/result';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AppHttpCode } from '../../enums/code.enum';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService, // private config,
    private config: ConfigService,
  ) {}
  genToken(payload: { id: string }) {
    console.log(this.jwtService.sign(payload), 'payloadpayloadpayloadpayload');
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    console.log(accessToken);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });
    return { accessToken, refreshToken };
  }
  async findOneByAccount(account: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { account } });
  }
  async login({ account, password }): Promise<ResultData> {
    let user = null;
    if (validPhone(account)) {
      // 手机登录
      user = await this.userRepo.findOne({ where: { phoneNum: account } });
    } else if (validEmail(account)) {
      // 邮箱
      user = await this.userRepo.findOne({ where: { email: account } });
    } else {
      // 帐号
      user = await this.findOneByAccount(account);
    }
    console.log(user, '我是user');
    if (!user)
      return ResultData.fail(
        AppHttpCode.USER_PASSWORD_INVALID,
        '帐号或密码错误',
      );
    // const checkPassword = await compare(password, user.password);
    // 密码也需要是存入加密的密码  需要调用bcryptjs中的库 不然一直是false  所以先暂时用全等
    const checkPassword = password === user.password;
    console.log(checkPassword, password, user.password);

    if (!checkPassword)
      return ResultData.fail(
        AppHttpCode.USER_PASSWORD_INVALID,
        '帐号或密码错误',
      );
    if (user.status === 0)
      return ResultData.fail(
        AppHttpCode.USER_ACCOUNT_FORBIDDEN,
        '您已被禁用，如需正常使用请联系管理员',
      );
    // // 生成 token
    const data = this.genToken({ id: '3666' });

    return ResultData.ok({ data: 'ok', token: data });
  }
}
