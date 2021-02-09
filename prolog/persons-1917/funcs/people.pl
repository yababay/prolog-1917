:- module(people, [родственники/2, персоны/1, связи/2]).
:- include("../facts/persons.pl").
:- include("../facts/relations.pl").

% ----- Персоны ----- %
персоны(L):-
    добавить_персону([], L).

добавить_персону(B, L):-
    персона(P, _),
    not(member(P, B)),
    добавить_персону([P|B], L),!.

добавить_персону(B, L):-
	L = B,!.

% ----- Связи ----- %
связи(P, L):-
    добавить_связь(P, [], L).

добавить_связь(P, B, L):-
	(связь(P, P1, _);связь(P1, P, _)),
    not(member(P1, B)),
    добавить_связь(P, [P1|B], L).

добавить_связь(_, B, L):-
	L = B,!.

% ----- Родственники ----- %

родственники(P, L):- 
    добавить_родственника(P, [], [], L).

добавить_родственника(P, A, B, L):-
    родственник(I1, I2, P, P2, R),
    not(member(P2, A)),
    T = [I1, I2, R],
    добавить_родственника(P, [P2|A], [T|B], L),!.

добавить_родственника(_, _, B, L):-
	L = B,!.

родственник(P1, P2, R):-
    персона(P1, _),
    персона(P2, G2),
    P1 \== P2,
    (
    	R = "дедушка",    связь(P1, P2, R);
    	R = "бабушка",    связь(P1, P2, R);
    	R = "мать",       связь(P1, P2, R);
    	R = "отец",       связь(P1, P2, R);
    	R = "муж",        связь(P1, P2, R);
    	R = "жена",       связь(P1, P2, R);
    	R = "гр. муж",    связь(P1, P2, R);
    	R = "гр. жена",   связь(P1, P2, R);
    	R = "брат",       связь(P1, P2, R);
    	R = "сестра",     связь(P1, P2, R);
    	R = "сын",        связь(P1, P2, R);
    	R = "дочь",       связь(P1, P2, R);
    	R = "внук",       связь(P1, P2, R);
    	R = "внучка",     связь(P1, P2, R);
    	R = "дядя",       связь(P1, P2, R);
    	R = "тётя",       связь(P1, P2, R);
    	R = "племянник",  связь(P1, P2, R);
    	R = "племянница", связь(P1, P2, R);
    	R = "дв. брат",   связь(P1, P2, R);
    	R = "дв. сестра", связь(P1, P2, R);
    	R = "св. брат",   связь(P1, P2, R);
    	R = "св. сестра", связь(P1, P2, R);
    
    	связь(P2, P1, "отец"), G2 = "м", R = "сын";
    	связь(P2, P1, "отец"), G2 = "ж", R = "дочь";
    
    	связь(P2, P1, "мать"), G2 = "м", R = "сын";
    	связь(P2, P1, "мать"), G2 = "ж", R = "дочь";
    
    	связь(P2, P1, "муж"),  R = "жена";
    	связь(P2, P1, "жена"), R = "муж";
    	связь(P2, P1, "гр. муж"),  R = "гр. жена";
    	связь(P2, P1, "гр. жена"), R = "гр. муж";
    
    	связь(P2, P1, "дочь"), G2 = "м", R = "отец";
    	связь(P2, P1, "дочь"), G2 = "ж", R = "мать";
    
    	связь(P2, P1, "сын"),  G2 = "м", R = "отец";
    	связь(P2, P1, "сын"),  G2 = "ж", R = "мать";
    
    	связь(P2, P1, "дедушка"), G2 = "м", R = "внук";
    	связь(P2, P1, "дедушка"), G2 = "ж", R = "внучка";
    	связь(P2, P1, "бабушка"), G2 = "м", R = "внук";
    	связь(P2, P1, "бабушка"), G2 = "ж", R = "внучка";
    	связь(P2, P1, "внук"),    G2 = "м", R = "дедушка";
    	связь(P2, P1, "внук"),    G2 = "ж", R = "бабушка";
    	связь(P2, P1, "внучка"),  G2 = "м", R = "дедушка";
    	связь(P2, P1, "внучка"),  G2 = "ж", R = "бабушка";
    	связь(P2, P1, "брат"),    G2 = "м", R = "брат";
    	связь(P2, P1, "брат"),    G2 = "ж", R = "сестра";
    	связь(P2, P1, "дядя"),    G2 = "м", R = "племянник";
    	связь(P2, P1, "дядя"),    G2 = "ж", R = "племянница";
    	связь(P2, P1, "тетя"),    G2 = "м", R = "племянник";
    	связь(P2, P1, "тетя"),    G2 = "ж", R = "племянница";
    	связь(P2, P1, "племянник"),  G2 = "м", R = "дядя";
    	связь(P2, P1, "племянник"),  G2 = "ж", R = "тётя";
    	связь(P2, P1, "племянница"), G2 = "м", R = "дядя";
    	связь(P2, P1, "племянница"), G2 = "ж", R = "тётя";
    	связь(P2, P1, "дв. брат"),   G2 = "м", R = "дв. брат";
    	связь(P2, P1, "дв. брат"),   G2 = "ж", R = "дв. сестра";
    	связь(P2, P1, "св. брат"),   G2 = "м", R = "св. брат";
    	связь(P2, P1, "св. брат"),   G2 = "ж", R = "св. сестра";
    	связь(P2, P1, "дв. сестра"), G2 = "м", R = "дв. брат";
    	связь(P2, P1, "дв. сестра"), G2 = "ж", R = "дв. сестра";
    	связь(P2, P1, "св. сестра"), G2 = "м", R = "св. брат";
    	связь(P2, P1, "св. сестра"), G2 = "ж", R = "св. сестра"
    ).
