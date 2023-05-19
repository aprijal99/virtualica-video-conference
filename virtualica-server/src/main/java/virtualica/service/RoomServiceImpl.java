package virtualica.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import virtualica.entity.Room;
import virtualica.repository.RoomRepository;

@Service
@Transactional
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public void saveRoom(Room room) {
        roomRepository.save(room);
    }

    @Override
    public Room findRoomById(String id) {
        return roomRepository.findById(id).orElse(null);
    }
}
