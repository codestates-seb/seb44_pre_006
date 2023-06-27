package com.codestates.stackoverflow.auth.oauth2;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/login/oauth2", produces = "application/json")
public class LoginController {
    private  final LoginService loginService;

    public LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @GetMapping("/code/{registration-id}")
    public void googleLogin(@RequestParam String code, @PathVariable("registration-id") String registrationId){
        System.out.println("hello google!");
        loginService.socialLogin(code, registrationId);
    }
}