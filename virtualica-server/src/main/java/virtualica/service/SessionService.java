package virtualica.service;

import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface SessionService {
    void addRoom(String roomId);
    void addSessionToRoom(WebSocketSession webSocketSession, String roomId, String userEmail);
    Map<String, WebSocketSession> getRoomSessions(String roomId);
}
