import isUndefined from "lodash-es/isUndefined";
import authConstant from "constants/auth";
import { getCookies } from "cookies-next";

export default function useGuestMiddleware(ctx, access_callback) {
  const cookies = getCookies({ req: ctx.req, res: ctx.res });
  if (!isUndefined(cookies[authConstant.TOKEN])) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return access_callback();
}
