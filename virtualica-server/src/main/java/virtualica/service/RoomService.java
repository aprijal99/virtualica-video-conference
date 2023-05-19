package virtualica.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import virtualica.entity.Room;

@Service
@Transactional
public interface RoomService {
    void saveRoom(Room room);
    Room findRoomById(String id);
}
