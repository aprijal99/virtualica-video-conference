package virtualica.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import virtualica.dto.RoomDto;
import virtualica.entity.Room;
import virtualica.entity.User;
import virtualica.repository.RoomRepository;

import java.sql.Timestamp;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public String saveRoom(Room room) {
        room.setId(UUID.randomUUID().toString());
        room.setRoomStatus(false);
        roomRepository.save(room);

        return room.getId();
    }

    @Override
    public Room findRoomById(String id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public Room dtoToEntity(RoomDto roomDto, User owner) {
        return Room.builder().roomName(roomDto.getRoomName()).owner(owner).createdAt(new Timestamp(roomDto.getCreatedAt())).build();
    }
}
