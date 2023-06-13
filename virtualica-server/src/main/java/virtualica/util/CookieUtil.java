package virtualica.util;

import jakarta.servlet.http.Cookie;

public class CookieUtil {
    public static Cookie generateCookie(String cookieKey, String cookieValue) {
        Cookie cookie = new Cookie(cookieKey, cookieValue);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(4 * 60 * 60);

        return cookie;
    }
}
