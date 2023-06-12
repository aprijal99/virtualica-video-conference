package virtualica.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SessionServiceImpl implements SessionService {
    private final Map<String, Map<String, WebSocketSession>> roomSessions = new HashMap<>();
    private final Map<String, List<String>> sessionInfo = new HashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void addRoom(String roomId) {
        roomSessions.put(roomId, new HashMap<>());
    }

    @Override
    public void addSessionToRoom(WebSocketSession webSocketSession, String roomId, String userEmail) {
        roomSessions.get(roomId).put(userEmail, webSocketSession);
        sessionInfo.put(webSocketSession.getId(), List.of(roomId, userEmail));

        Map<String, Object> joinResponse = new HashMap<>();
        joinResponse.put("event", "JOIN");
        joinResponse.put("data", roomSessions.get(roomId).keySet());

        try {
            webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsBytes(joinResponse)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println(roomSessions.get(roomId));
    }

    @Override
    public Map<String, WebSocketSession> getRoomSessions(String roomId) {
        return roomSessions.get(roomId);
    }

    @Override
    public void sendRequestMessage(String roomId, String senderEmail, TextMessage textMessage) {
        this.getRoomSessions(roomId).forEach((email, session) -> {
            if (session.isOpen() && !email.equals(senderEmail)) {
                try {
                    session.sendMessage(textMessage);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Override
    public void sendOfferCandidateAndAnswerMessage(String roomId, String receiverEmail, TextMessage textMessage) {
        try {
            roomSessions.get(roomId).get(receiverEmail).sendMessage(textMessage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendChatMessage(String roomId, String senderEmail, TextMessage textMessage) {
        this.getRoomSessions(roomId).forEach((email, session) -> {
            if (session.isOpen() && !email.equals(senderEmail)) {
                try {
                    session.sendMessage(textMessage);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Override
    public void deleteSession(WebSocketSession webSocketSession) {
        List<String> roomIdAndUserEmail = sessionInfo.get(webSocketSession.getId());

        if (roomIdAndUserEmail != null) {
            String roomId = roomIdAndUserEmail.get(0);
            String userEmail = roomIdAndUserEmail.get(1);

            roomSessions.get(roomId).remove(userEmail);

            System.out.println(roomSessions.get(roomId));
        }
    }

    @Override
    public void deleteRoom(String roomId) {
        roomSessions.remove(roomId);
    }
}
