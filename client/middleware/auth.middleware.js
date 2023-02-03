import isUndefined from "lodash-es/isUndefined";
import { getCookies } from "cookies-next";
import authConstant from "constants/auth";

export default function useAuthMiddleware(ctx, access_callback) {
  const cookies = getCookies({ req: ctx.req, res: ctx.res });
  if (isUndefined(cookies[authConstant.TOKEN])) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return access_callback();
}
