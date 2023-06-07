package virtualica.configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import virtualica.service.RoomService;
import virtualica.service.SessionService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@AllArgsConstructor
public class SocketHandler extends TextWebSocketHandler {
//    private final SessionService sessionService;
//
//    @Override
//    protected void handleTextMessage(WebSocketSession webSocketSession, TextMessage textMessage) throws Exception {
//        Map<String, Object> map = new ObjectMapper().readValue(textMessage.getPayload(), new TypeReference<>(){});
//        String type = (String) map.get("type");
//        String roomId = (String) map.get("roomId");
//        String senderEmail = (String) map.get("senderEmail");
//
//        switch (type) {
//            case "JOIN" -> sessionService.addSessionToRoom(webSocketSession, roomId, senderEmail);
//            case "REQUEST" -> sessionService.sendRequestMessage(roomId, senderEmail, textMessage);
//            case "OFFER", "CANDIDATE", "ANSWER" -> {
//                String receiverEmail = (String) map.get("receiverEmail");
//                sessionService.sendOfferCandidateAndAnswerMessage(roomId, receiverEmail, textMessage);
//            }
//        }
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus status) {
//        sessionService.deleteSession(webSocketSession);
//    }

    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    @Override
    protected void handleTextMessage(WebSocketSession webSocketSession, TextMessage message) {
        webSocketSessions.forEach((session) -> {
            if (session.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                try {
                    session.sendMessage(message);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession webSocketSession) {
        webSocketSessions.add(webSocketSession);
        System.out.println(webSocketSessions);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus status) {
        webSocketSessions.remove(webSocketSession);
        System.out.println(webSocketSessions);
    }
}
