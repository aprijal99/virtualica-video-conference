package virtualica.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import virtualica.dto.RoomDto;
import virtualica.entity.Room;
import virtualica.entity.User;
import virtualica.service.RoomService;
import virtualica.service.UserService;
import virtualica.util.ApiResponse;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/room")
public class RoomController {
    private final UserService userService;
    private final RoomService roomService;

    @GetMapping(path = "/{roomId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRoomById(@PathVariable(name = "roomId") String roomId) {
        Room room = roomService.findRoomById(roomId);

        if (room != null) {
            RoomDto roomDto = roomService.entityToDto(room);

            return ResponseEntity.status(HttpStatus.FOUND)
                    .body(ApiResponse.jsonWithData(HttpStatus.FOUND, roomDto));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.jsonNoData(HttpStatus.NOT_FOUND));
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createRoom(@RequestBody RoomDto roomDto) {
        User owner = userService.findUserByEmail(roomDto.getOwnerEmail());
        Room room = roomService.dtoToEntity(roomDto, owner);
        String roomId = roomService.saveRoom(room);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.jsonWithData(HttpStatus.CREATED, Map.of("roomId", roomId)));
    }
}
