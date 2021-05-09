package com.rafitj.mesh.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.rafitj.mesh.proto.request.VerifyTokenRequest;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTService {

    public boolean isValidJWT(VerifyTokenRequest token) {
        try {
            return !JWT.decode(token.getToken()).getExpiresAt().before(new Date());
        } catch (JWTDecodeException e) {
            return false;
        }
    }

}
