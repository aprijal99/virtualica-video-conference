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
    Room findRoomById(String roomId);
    boolean updateRoomStatus(String roomId);
    void deleteRoom(String roomId);
    Room dtoToEntity(RoomDto roomDto, User owner);
    RoomDto entityToDto(Room room);
}
