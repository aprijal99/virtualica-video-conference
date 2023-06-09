package virtualica.service;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface SessionService {
    void addRoom(String roomId);
    void addSessionToRoom(WebSocketSession webSocketSession, String roomId, String userEmail);
    Map<String, WebSocketSession> getRoomSessions(String roomId);
    void sendRequestMessage(String roomId, String senderEmail, TextMessage textMessage);
    void sendOfferCandidateAndAnswerMessage(String roomId, String receiverEmail, TextMessage textMessage);
    void sendChatMessage(String roomId, String senderEmail, TextMessage textMessage);
    void deleteSession(WebSocketSession webSocketSession);
    void deleteRoom(String roomId);
}
