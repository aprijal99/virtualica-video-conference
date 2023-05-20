package virtualica.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import virtualica.dto.RoomDto;
import virtualica.entity.Room;
import virtualica.entity.User;

@Service
@Transactional
public interface RoomService {
    String saveRoom(Room room);
    Room findRoomById(String id);
    Room dtoToEntity(RoomDto roomDto, User owner);
}
