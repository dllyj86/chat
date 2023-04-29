/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';


// **** Types **** //

interface IArgs {
  env: string;
}


// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

// Set the env file
const result2 = dotenv.config({
  // .env文件的位置，要参考编译后的dist目录中的pre-start.js，相对于server/env目录的位置来设置
  // 但是使用dev方式启动时,路径就不对了.正确的路径必须相对于这个文件的路径
  // path: path.join(__dirname, `../env/${args.env}.env`),
  path: path.join(__dirname, args.env === 'development' ? `../env/${args.env}.env`: `../server/env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}
