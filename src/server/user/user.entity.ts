import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType, StatusValue } from '../../enums/common.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: '用户登录密码',
  })
  public password: string;

  @Column({ type: 'varchar', length: 200, nullable: false, comment: '盐' })
  public salt: string;

  @Column({ type: 'varchar', length: 45, comment: '用户登录账号' })
  public account: string;

  @Column({
    type: 'varchar',
    name: 'phone_num',
    default: '',
    length: 20,
    comment: '用户手机号码',
  })
  public phoneNum: string;

  @Column({ type: 'varchar', comment: '邮箱地址', default: '' })
  public email: string;

  @Column({
    type: 'tinyint',
    default: StatusValue.NORMAL,
    comment: '所属状态: 1-有效，0-禁用',
  })
  public status: StatusValue;

  @Column({ type: 'varchar', comment: '头像地址' })
  public avatar: string;

  @Column({
    type: 'tinyint',
    default: UserType.ORDINARY_USER,
    comment: '帐号类型：0-超管， 1-普通用户',
  })
  public type: UserType;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    comment: '更新时间',
  })
  updateDate: Date;
}
