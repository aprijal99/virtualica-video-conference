package virtualica.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import virtualica.dto.UserDto;
import virtualica.service.UserService;
import virtualica.util.ApiResponse;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/user")
public class UserController {
    private final UserService userService;

    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> userSignup(@RequestBody UserDto userDto) {
        userService.saveUser(userService.dtoToEntity(userDto));

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.jsonStructureNoData(HttpStatus.CREATED));
    }
}
