package com.rafitj.mesh.config;

public class SecurityConstants {
    public static final String SECRET = "SECRET_KEY";
    public static final long EXPIRATION_TIME = 900_000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/user/signup";
    public static final String CHECK_USERNAME_URL = "/user/check/*";
    public static final String VERIFY_TOKEN_URL = "/user/verify";
}
