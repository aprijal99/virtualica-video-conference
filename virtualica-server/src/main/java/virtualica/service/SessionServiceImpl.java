package virtualica.service;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Service
public class SessionServiceImpl implements SessionService {
    private final Map<String, Map<String, WebSocketSession>> roomSessions = new HashMap<>();

    @Override
    public void addRoom(String roomId) {
        roomSessions.put(roomId, new HashMap<>());
    }

    @Override
    public void addSessionToRoom(WebSocketSession webSocketSession, String roomId, String userEmail) {
        roomSessions.get("roomId").put(userEmail, webSocketSession);
    }

    @Override
    public Map<String, WebSocketSession> getRoomSessions(String roomId) {
        return roomSessions.get("roomId");
    }

    @Override
    public void deleteSession(String roomId, String userEmail) {
        roomSessions.get(roomId).remove(userEmail);
    }

    @Override
    public void deleteRoom(String roomId) {
        roomSessions.remove(roomId);
    }
}
